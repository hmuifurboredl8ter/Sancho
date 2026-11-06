import re
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

def set_cell_background(cell, fill_hex):
    tcPr = cell._element.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), fill_hex)
    tcPr.append(shd)

def set_cell_margins(cell, top=140, bottom=140, left=200, right=200):
    tcPr = cell._element.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_cell_border(cell, **kwargs):
    tcPr = cell._element.get_or_add_tcPr()
    tcBorders = OxmlElement('w:tcBorders')
    for edge in ('top', 'left', 'bottom', 'right', 'insideH', 'insideV'):
        edge_data = kwargs.get(edge)
        if edge_data:
            tag = f'w:{edge}'
            element = OxmlElement(tag)
            element.set(qn('w:val'), edge_data.get('val', 'single'))
            element.set(qn('w:sz'), str(edge_data.get('sz', 4)))
            element.set(qn('w:space'), '0')
            element.set(qn('w:color'), edge_data.get('color', 'auto'))
            tcBorders.append(element)
    tcPr.append(tcBorders)

def add_callout(doc, text, title=None, fill="F5F7FA", border_color="1B365D", italic=False, bold=False):
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell = table.rows[0].cells[0]
    set_cell_background(cell, fill)
    set_cell_margins(cell, top=180, bottom=180, left=240, right=240)
    set_cell_border(cell, left={'val': 'single', 'sz': 18, 'color': border_color})

    if title:
        tp = cell.add_paragraph()
        tp.paragraph_format.space_after = Pt(4)
        tr = tp.add_run(title)
        tr.font.name = 'Georgia'
        tr.font.size = Pt(10)
        tr.font.bold = True
        tr.font.color.rgb = RGBColor(27, 54, 93)

    p = cell.add_paragraph()
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.2
    run = p.add_run(text)
    run.font.name = 'Georgia'
    run.font.size = Pt(11)
    run.font.bold = bold
    run.font.italic = italic

def build_manual_docx(md_path, docx_path):
    print(f"Building {docx_path} from {md_path}...")
    with open(md_path, 'r', encoding='utf-8') as f:
        text = f.read()

    doc = Document()
    sections = doc.sections
    for section in sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.2)
        section.right_margin = Inches(1.2)

    NAVY = RGBColor(27, 54, 93)         # #1B365D
    GOLD = RGBColor(184, 134, 11)       # #B8860B
    CHARCOAL = RGBColor(34, 34, 34)
    BURGUNDY = RGBColor(114, 28, 36)

    normal = doc.styles['Normal']
    normal.font.name = 'Georgia'
    normal.font.size = Pt(11)
    normal.font.color.rgb = CHARCOAL
    normal.paragraph_format.line_spacing = 1.25
    normal.paragraph_format.space_after = Pt(6)

    lines = text.split('\n')
    i = 0

    while i < len(lines):
        line = lines[i].strip()

        if not line:
            i += 1
            continue

        if line == "# Señor Sancho Blanco's Guide to Being the Perfect Other Guy":
            p = doc.add_paragraph()
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p.paragraph_format.space_before = Pt(72)
            p.paragraph_format.space_after = Pt(12)
            run = p.add_run("SEÑOR SANCHO BLANCO'S GUIDE TO\nBEING THE PERFECT OTHER GUY")
            run.font.name = 'Georgia'
            run.font.size = Pt(22)
            run.font.bold = True
            run.font.color.rgb = NAVY
            i += 1
            continue

        if line.startswith('*An Unauthorized Manual'):
            p = doc.add_paragraph()
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p.paragraph_format.space_after = Pt(36)
            run = p.add_run(line.strip('*'))
            run.font.name = 'Georgia'
            run.font.size = Pt(12)
            run.font.italic = True
            run.font.color.rgb = GOLD
            doc.add_page_break()
            i += 1
            continue

        if line.startswith('## DISCLAIMER'):
            doc.add_page_break()
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(30)
            p.paragraph_format.space_after = Pt(14)
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            run = p.add_run("DISCLAIMER: READ BEFORE YOU RUIN SOMEBODY'S EVENING")
            run.font.name = 'Georgia'
            run.font.size = Pt(14)
            run.font.bold = True
            run.font.color.rgb = BURGUNDY
            i += 1
            continue

        if line.startswith('## Table of Contents'):
            doc.add_page_break()
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(24)
            p.paragraph_format.space_after = Pt(14)
            run = p.add_run("Table of Contents")
            run.font.name = 'Georgia'
            run.font.size = Pt(16)
            run.font.bold = True
            run.font.color.rgb = NAVY
            i += 1
            continue

        if line.startswith('# Part '):
            doc.add_page_break()
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(120)
            p.paragraph_format.space_after = Pt(18)
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            run = p.add_run(line.replace('#', '').strip())
            run.font.name = 'Georgia'
            run.font.size = Pt(20)
            run.font.bold = True
            run.font.color.rgb = NAVY
            i += 1
            continue

        if line.startswith('# Chapter ') or line.startswith('# Prologue:') or line.startswith('# Epilogue:'):
            doc.add_page_break()
            ch_title = line.replace('#', '').strip()
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(30)
            p.paragraph_format.space_after = Pt(14)
            p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            run = p.add_run(ch_title)
            run.font.name = 'Georgia'
            run.font.size = Pt(16)
            run.font.bold = True
            run.font.color.rgb = NAVY
            i += 1
            continue

        if line.startswith('## SANCHO’S LAW') or line.startswith('## SANCHO\'S LAW') or line.startswith('### SANCHO’S LAW') or line.startswith('### SANCHO\'S LAW'):
            i += 1
            while i < len(lines) and not lines[i].strip():
                i += 1
            law_text = ""
            if i < len(lines):
                law_text = lines[i].strip().strip('*')
                i += 1
            add_callout(doc, law_text, title="SANCHO’S LAW", fill="FBF8F1", border_color="B8860B", bold=True, italic=True)
            continue

        if line.startswith('## THE LECTURE') or line.startswith('### THE LECTURE'):
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(16)
            p.paragraph_format.space_after = Pt(6)
            run = p.add_run("THE LECTURE")
            run.font.name = 'Georgia'
            run.font.size = Pt(12)
            run.font.bold = True
            run.font.color.rgb = NAVY
            i += 1
            continue

        if line.startswith('## THE CASE STUDY') or line.startswith('### THE CASE STUDY'):
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(16)
            p.paragraph_format.space_after = Pt(6)
            run = p.add_run("THE CASE STUDY")
            run.font.name = 'Georgia'
            run.font.size = Pt(12)
            run.font.bold = True
            run.font.color.rgb = NAVY
            i += 1
            continue

        if line.startswith('## THE REALITY CHECK') or line.startswith('### THE REALITY CHECK'):
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(16)
            p.paragraph_format.space_after = Pt(6)
            run = p.add_run("THE REALITY CHECK")
            run.font.name = 'Georgia'
            run.font.size = Pt(12)
            run.font.bold = True
            run.font.color.rgb = BURGUNDY
            i += 1
            continue

        if line.startswith('## THE BLANCO RULE') or line.startswith('### THE BLANCO RULE'):
            i += 1
            while i < len(lines) and not lines[i].strip():
                i += 1
            rule_text = ""
            if i < len(lines):
                rule_text = lines[i].strip().strip('*')
                i += 1
            add_callout(doc, rule_text, title="THE BLANCO RULE", fill="F4F6F9", border_color="1B365D", bold=True)
            continue

        if line == '---':
            i += 1
            continue

        # Regular text
        p = doc.add_paragraph()
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.line_spacing = 1.25

        parts = re.split(r'(\*\*.*?\*\*|\*.*?\*)', line)
        for part in parts:
            if not part:
                continue
            if part.startswith('**') and part.endswith('**'):
                r = p.add_run(part[2:-2])
                r.font.name = 'Georgia'
                r.font.bold = True
            elif part.startswith('*') and part.endswith('*'):
                r = p.add_run(part[1:-1])
                r.font.name = 'Georgia'
                r.font.italic = True
            else:
                r = p.add_run(part)
                r.font.name = 'Georgia'
        i += 1

    doc.save(docx_path)
    print(f"Successfully generated {docx_path}")

if __name__ == '__main__':
    build_manual_docx('Senor-Sancho-Blanco-Complete-Manuscript.md', 'Senor-Sancho-Blanco-Guide-to-Being-the-Perfect-Other-Guy.docx')
