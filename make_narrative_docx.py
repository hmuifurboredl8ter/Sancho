import re
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
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

def build_narrative_docx(md_path, docx_path):
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

    # Palette
    BURGUNDY = RGBColor(88, 17, 26)     # #58111A
    AMBER_GOLD = RGBColor(197, 160, 89)  # #C5A059
    CHARCOAL = RGBColor(34, 34, 34)      # #222222
    SLATE = RGBColor(100, 100, 100)

    # Base style
    normal = doc.styles['Normal']
    normal.font.name = 'Georgia'
    normal.font.size = Pt(11)
    normal.font.color.rgb = CHARCOAL
    normal.paragraph_format.line_spacing = 1.25
    normal.paragraph_format.space_after = Pt(6)

    lines = text.split('\n')
    i = 0
    in_series_bible = False

    while i < len(lines):
        line = lines[i].strip()

        if not line:
            i += 1
            continue

        if line.startswith('# SEÑOR SANCHO BLANCO'):
            p = doc.add_paragraph()
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p.paragraph_format.space_before = Pt(72)
            p.paragraph_format.space_after = Pt(12)
            run = p.add_run("SEÑOR SANCHO BLANCO:\nTHE LEGEND AND THE LESSON")
            run.font.name = 'Georgia'
            run.font.size = Pt(24)
            run.font.bold = True
            run.font.color.rgb = BURGUNDY
            i += 1
            continue

        if line.startswith('*A Tale of High Protocol'):
            p = doc.add_paragraph()
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p.paragraph_format.space_after = Pt(36)
            run = p.add_run("A Tale of High Protocol, Low Intentions, and the Battle for the Table at La Paloma")
            run.font.name = 'Georgia'
            run.font.size = Pt(13)
            run.font.italic = True
            run.font.color.rgb = AMBER_GOLD
            doc.add_page_break()
            i += 1
            continue

        if line.startswith('## FOREWORD') or line.startswith('## PREFACE') or line.startswith('## PROLOGUE') or line.startswith('## EPILOGUE') or line.startswith('## SERIES BIBLE'):
            doc.add_page_break()
            title = line.replace('##', '').strip()
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(24)
            p.paragraph_format.space_after = Pt(14)
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            run = p.add_run(title)
            run.font.name = 'Georgia'
            run.font.size = Pt(18)
            run.font.bold = True
            run.font.color.rgb = BURGUNDY
            i += 1
            continue

        if line.startswith('## PART '):
            doc.add_page_break()
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(120)
            p.paragraph_format.space_after = Pt(18)
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            run = p.add_run(line.replace('##', '').strip())
            run.font.name = 'Georgia'
            run.font.size = Pt(20)
            run.font.bold = True
            run.font.color.rgb = BURGUNDY
            i += 1
            continue

        if line.startswith('### CHAPTER'):
            doc.add_page_break()
            ch_title = line.replace('###', '').strip()
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(30)
            p.paragraph_format.space_after = Pt(16)
            p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            run = p.add_run(ch_title)
            run.font.name = 'Georgia'
            run.font.size = Pt(16)
            run.font.bold = True
            run.font.color.rgb = BURGUNDY
            i += 1
            continue

        if line.startswith('### '):
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(18)
            p.paragraph_format.space_after = Pt(8)
            run = p.add_run(line.replace('###', '').strip())
            run.font.name = 'Georgia'
            run.font.size = Pt(13)
            run.font.bold = True
            run.font.color.rgb = BURGUNDY
            i += 1
            continue

        # Check for letter block in Ch 9 (*Sancho,* ... *— Elena*)
        if line.startswith('*Sancho,*') or line == '*Sancho,*':
            letter_lines = []
            while i < len(lines) and not (lines[i].strip().startswith('*— Elena*') or lines[i].strip().startswith('*— E.*')):
                if lines[i].strip():
                    letter_lines.append(lines[i].strip().strip('*'))
                i += 1
            if i < len(lines):
                letter_lines.append(lines[i].strip().strip('*'))
                i += 1

            table = doc.add_table(rows=1, cols=1)
            table.alignment = WD_TABLE_ALIGNMENT.CENTER
            cell = table.rows[0].cells[0]
            set_cell_background(cell, "F9F6F0")
            set_cell_margins(cell, top=200, bottom=200, left=300, right=300)
            set_cell_border(cell, left={'val': 'single', 'sz': 16, 'color': 'C5A059'})

            for l_idx, l_text in enumerate(letter_lines):
                lp = cell.add_paragraph()
                lp.paragraph_format.space_after = Pt(6)
                lp.paragraph_format.line_spacing = 1.2
                if l_idx == 0:
                    r = lp.add_run(l_text)
                    r.font.name = 'Georgia'
                    r.font.italic = True
                    r.font.bold = True
                elif l_idx == len(letter_lines) - 1:
                    lp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
                    r = lp.add_run(l_text)
                    r.font.name = 'Georgia'
                    r.font.italic = True
                    r.font.bold = True
                else:
                    r = lp.add_run(l_text)
                    r.font.name = 'Georgia'
                    r.font.italic = True
            continue

        # Regular Paragraph
        p = doc.add_paragraph()
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.line_spacing = 1.25

        # Format inline bold/italics
        clean_line = line
        parts = re.split(r'(\*\*.*?\*\*|\*.*?\*)', clean_line)
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
    build_narrative_docx('The-Legend-of-Senor-Sancho-Blanco-Revised-Draft.md', 'The-Legend-of-Senor-Sancho-Blanco.docx')
