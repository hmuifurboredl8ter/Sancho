import re
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

# Build While Bleeding Canonical Palette:
# Asphalt: #11100E (Primary dark foundation)
# Bone:    #E7E0D4 (Light foundation / readable contrast)
# Rust:    #C2332B (Reserve for large "bleeding" titles / shapes)
# Bronze:  #C5A36A (Emphasis & primary accents)
# Chrome:  #B9BDC2 (Metallic accents)

ASPHALT_HEX = "11100E"
BONE_HEX    = "E7E0D4"
RUST_HEX    = "C2332B"
BRONZE_HEX  = "C5A36A"
CHROME_HEX  = "B9BDC2"

COLOR_ASPHALT = RGBColor(17, 16, 14)
COLOR_BONE    = RGBColor(231, 224, 212)
COLOR_RUST    = RGBColor(194, 51, 43)
COLOR_BRONZE  = RGBColor(197, 163, 106)
COLOR_CHROME  = RGBColor(185, 189, 194)

def set_cell_background(cell, fill_hex):
    tcPr = cell._element.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), fill_hex)
    tcPr.append(shd)

def set_cell_margins(cell, top=160, bottom=160, left=240, right=240):
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

def build_bwb_narrative_docx(md_path, docx_path):
    print(f"Generating BWB-styled {docx_path}...")
    with open(md_path, 'r', encoding='utf-8') as f:
        text = f.read()

    doc = Document()
    for section in doc.sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.1)
        section.right_margin = Inches(1.1)

    normal = doc.styles['Normal']
    normal.font.name = 'Libre Franklin'
    normal.font.size = Pt(10.5)
    normal.font.color.rgb = COLOR_ASPHALT
    normal.paragraph_format.line_spacing = 1.25
    normal.paragraph_format.space_after = Pt(6)

    lines = text.split('\n')
    i = 0

    while i < len(lines):
        line = lines[i].strip()
        if not line:
            i += 1
            continue

        if line.startswith('# SEÑOR SANCHO BLANCO'):
            p = doc.add_paragraph()
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p.paragraph_format.space_before = Pt(80)
            p.paragraph_format.space_after = Pt(10)
            r = p.add_run("SEÑOR SANCHO BLANCO\nTHE LEGEND AND THE LESSON")
            r.font.name = 'Impact'
            r.font.size = Pt(26)
            r.font.color.rgb = COLOR_RUST
            i += 1
            continue

        if line.startswith('*A Tale of High Protocol'):
            p = doc.add_paragraph()
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p.paragraph_format.space_after = Pt(40)
            r = p.add_run("A Tale of High Protocol, Low Intentions, and the Battle for the Table at La Paloma")
            r.font.name = 'Libre Franklin'
            r.font.size = Pt(11)
            r.font.italic = True
            r.font.color.rgb = COLOR_BRONZE
            doc.add_page_break()
            i += 1
            continue

        if line.startswith('## FOREWORD') or line.startswith('## PREFACE') or line.startswith('## PROLOGUE') or line.startswith('## EPILOGUE') or line.startswith('## SERIES BIBLE'):
            doc.add_page_break()
            title = line.replace('##', '').strip()
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(24)
            p.paragraph_format.space_after = Pt(12)
            p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            r = p.add_run(title.upper())
            r.font.name = 'Impact'
            r.font.size = Pt(18)
            r.font.color.rgb = COLOR_ASPHALT
            i += 1
            continue

        if line.startswith('## PART '):
            doc.add_page_break()
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(120)
            p.paragraph_format.space_after = Pt(16)
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            r = p.add_run(line.replace('##', '').strip().upper())
            r.font.name = 'Impact'
            r.font.size = Pt(22)
            r.font.color.rgb = COLOR_RUST
            i += 1
            continue

        if line.startswith('### CHAPTER'):
            doc.add_page_break()
            ch_title = line.replace('###', '').strip()
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(28)
            p.paragraph_format.space_after = Pt(14)
            p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            r = p.add_run(ch_title.upper())
            r.font.name = 'Impact'
            r.font.size = Pt(16)
            r.font.color.rgb = COLOR_ASPHALT
            i += 1
            continue

        if line.startswith('### '):
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(18)
            p.paragraph_format.space_after = Pt(6)
            r = p.add_run(line.replace('###', '').strip().upper())
            r.font.name = 'Impact'
            r.font.size = Pt(13)
            r.font.color.rgb = COLOR_BRONZE
            i += 1
            continue

        # Elena's Letter block in Chapter 9
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
            set_cell_background(cell, BONE_HEX)
            set_cell_margins(cell, top=180, bottom=180, left=260, right=260)
            set_cell_border(cell, left={'val': 'single', 'sz': 18, 'color': BRONZE_HEX})

            for l_idx, l_text in enumerate(letter_lines):
                lp = cell.add_paragraph()
                lp.paragraph_format.space_after = Pt(4)
                lp.paragraph_format.line_spacing = 1.2
                if l_idx == 0:
                    r = lp.add_run(l_text)
                    r.font.name = 'Libre Franklin'
                    r.font.bold = True
                    r.font.color.rgb = COLOR_ASPHALT
                elif l_idx == len(letter_lines) - 1:
                    lp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
                    r = lp.add_run(l_text)
                    r.font.name = 'Libre Franklin'
                    r.font.bold = True
                    r.font.color.rgb = COLOR_ASPHALT
                else:
                    r = lp.add_run(l_text)
                    r.font.name = 'Libre Franklin'
                    r.font.italic = True
                    r.font.color.rgb = COLOR_ASPHALT
            continue

        # Normal paragraph
        p = doc.add_paragraph()
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.line_spacing = 1.25

        parts = re.split(r'(\*\*.*?\*\*|\*.*?\*)', line)
        for part in parts:
            if not part:
                continue
            if part.startswith('**') and part.endswith('**'):
                r = p.add_run(part[2:-2])
                r.font.name = 'Libre Franklin'
                r.font.bold = True
                r.font.color.rgb = COLOR_ASPHALT
            elif part.startswith('*') and part.endswith('*'):
                r = p.add_run(part[1:-1])
                r.font.name = 'Libre Franklin'
                r.font.italic = True
                r.font.color.rgb = COLOR_ASPHALT
            else:
                r = p.add_run(part)
                r.font.name = 'Libre Franklin'
                r.font.color.rgb = COLOR_ASPHALT
        i += 1

    doc.save(docx_path)
    print(f"Saved {docx_path}")

if __name__ == '__main__':
    build_bwb_narrative_docx('The-Legend-of-Senor-Sancho-Blanco-Revised-Draft.md', 'The-Legend-of-Senor-Sancho-Blanco.docx')
