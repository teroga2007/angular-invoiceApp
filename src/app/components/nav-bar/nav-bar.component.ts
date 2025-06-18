import { Component, Input } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Invoice } from '../../models/invoice';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  @Input() invoice!: Invoice;

  descargarPDF() {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text(`Factura #${this.invoice.id}`, 14, 20);

    // Cliente
    doc.setFontSize(12);
    doc.text(`Cliente: ${this.invoice.customer.name}`, 14, 30);
    doc.text(`Email: ${this.invoice.customer.email}`, 14, 37);
    doc.text(`Teléfono: ${this.invoice.customer.phone}`, 14, 44);
    doc.text(
      `Dirección: ${this.invoice.customer.address.street} ${this.invoice.customer.address.zip}`,
      14,
      51
    );

    // Empresa
    doc.text(`Empresa: ${this.invoice.company.name}`, 14, 61);
    doc.text(`Email empresa: ${this.invoice.company.email}`, 14, 68);

    // Tabla de ítems
    autoTable(doc, {
      startY: 80,
      head: [['ID', 'Descripción', 'Cantidad', 'Precio']],
      body: this.invoice.items.map((item) => [
        item.id,
        item.description,
        item.quantity,
        item.price,
      ]),
      styles: {
        fontSize: 10,
        cellPadding: 4,
      },
      headStyles: {
        fillColor: [75, 58, 112], // #4B3A70
        textColor: 255,
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    doc.save(`factura-${this.invoice.id}.pdf`);
  }
}
