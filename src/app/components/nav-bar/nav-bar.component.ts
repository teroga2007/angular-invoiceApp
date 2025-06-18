import { Component, Input } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Invoice } from '../../models/invoice';
import { logoBase64 } from '../../data/logo';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  @Input() invoice!: Invoice;

  descargarPDF() {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    const currencySymbol = this.invoice.currency === 'CRC' ? '₡' : '$';
    const tax = this.invoice.applyTax ? this.invoice.total * 0.13 : 0;
    const totalWithTax = this.invoice.total + tax;

    // ---------------------------------
    // Header
    // ---------------------------------
    doc.setFillColor(75, 58, 112); // bg-primary
    doc.rect(0, 0, pageWidth, 30, 'F');

    // Logo
    const logoHeight = 20;
    const logoWidth = 20;
    doc.addImage(logoBase64, 'base64', 10, 5, logoWidth, logoHeight);

    // S-Digital branding
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('S-Digital', 35, 20);

    // ---------------------------------
    // Content
    // ---------------------------------
    const contentStartY = 45;
    let y = contentStartY;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(18);
    doc.setTextColor(75, 58, 112);
    doc.text(`Invoice #${this.invoice.id}`, 14, y);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Date: ${this.invoice.date}`, pageWidth - 14, y, {
      align: 'right',
    });

    y += 10;
    const cust = this.invoice.customer;
    doc.text(`Customer: ${cust.name}`, 14, y);
    y += 7;
    doc.text(`Email: ${cust.email}`, 14, y);
    y += 7;
    doc.text(`Phone: ${cust.phone}`, 14, y);
    y += 7;
    doc.text(`Address: ${cust.address.street} ${cust.address.zip}`, 14, y);
    y += 10;

    const comp = this.invoice.company;
    doc.text(`Company: ${comp.name}`, 14, y);
    y += 7;
    doc.text(`Email: ${comp.email}`, 14, y);
    y += 7;

    // ---------------------------------
    // Ítems
    // ---------------------------------
    autoTable(doc, {
      startY: y + 10,
      head: [['#', 'Description', 'Quantity', 'Price']],
      body: this.invoice.items.map((item, i) => [
        i + 1,
        item.description,
        item.quantity,
        `${currencySymbol}${item.price.toFixed(2)}`,
      ]),
      styles: {
        fontSize: 10,
        cellPadding: 4,
      },
      headStyles: {
        fillColor: [75, 58, 112],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { top: 10, left: 14, right: 14 },
      theme: 'striped',
    });

    // ---------------------------------
    // Totals
    // ---------------------------------
    const finalY = (doc as any).lastAutoTable.finalY + 10;

    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text('Summary', pageWidth - 14, finalY, { align: 'right' });

    const resumen = [
      ['Subtotal:', `${currencySymbol}${this.invoice.total.toFixed(2)}`],
      ...(this.invoice.applyTax
        ? [['Tax (13%):', `${currencySymbol}${tax.toFixed(2)}`]]
        : []),
      ['Total:', `${currencySymbol}${totalWithTax.toFixed(2)}`],
    ];

    resumen.forEach(([label, value], i) => {
      doc.setFontSize(label === 'Total:' ? 14 : 12);
      if (label === 'Total:') {
        doc.setTextColor(75, 58, 112);
      } else {
        doc.setTextColor(0);
      }
      doc.text(label, pageWidth - 60, finalY + 8 + i * 7, { align: 'right' });
      doc.text(value, pageWidth - 14, finalY + 8 + i * 7, { align: 'right' });
    });

    // ---------------------------------
    // Save
    // ---------------------------------
    doc.save(`invoice-${this.invoice.id}.pdf`);
  }
}
