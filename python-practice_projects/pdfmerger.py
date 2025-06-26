from PyPDF2 import PdfWriter

merger = PdfWriter()
n=int(input("Enter the number of PDF you want to merge"))
pdfs=[]
for i in range(n):
    name= input("Enter the name of PDF file ({i+1}th): ")
    pdfs.append(name)

for pdf in pdfs:
    merger.append(pdf)

merger.write("merged-pdf.pdf")
merger.close()