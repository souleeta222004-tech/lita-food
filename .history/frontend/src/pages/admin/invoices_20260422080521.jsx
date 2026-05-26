import { useState } from "react";
import "../../assets/style/admin/invoices.css";

export default function InvoicesPage() {
  const [invoices] = useState([
    {
      _id: "1",
      table: { name: "Bàn 1" },
      items: [
        { name: "Trà sữa", price: 30000, quantity: 2 },
        { name: "Gà rán", price: 50000, quantity: 1 },
      ],
      totalAmount: 110000,
      paymentStatus: "paid",
      createdAt: new Date(),
    },
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const renderStatus = (status) => {
    switch (status) {
      case "paid":
        return "Đã thanh toán";
      case "pending":
        return "Chờ thanh toán";
      default:
        return status;
    }
  };

  return (
    <div className="invoice-page">
      <h2>Hóa đơn</h2>

      <div className="invoice-content">
        {/* LEFT */}
        <div className="invoice-list">
          {invoices.map((inv) => (
            <div
              key={inv._id}
              className={`invoice-card ${
                selectedInvoice?._id === inv._id ? "active" : ""
              }`}
              onClick={() => setSelectedInvoice(inv)}
            >
              <h4>{inv.table?.name}</h4>
              <p>{inv.totalAmount.toLocaleString()}đ</p>

              <span className={`invoice-status ${inv.paymentStatus}`}>
                {renderStatus(inv.paymentStatus)}
              </span>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="invoice-detail">
          {!selectedInvoice ? (
            <p>Chọn hóa đơn để xem chi tiết</p>
          ) : (
            <>
              <h3>{selectedInvoice.table?.name}</h3>

              <div className="invoice-items">
                {selectedInvoice.items.map((item, idx) => (
                  <div key={idx} className="invoice-item">
                    <span>{item.name}</span>
                    <span>x{item.quantity}</span>
                    <span>
                      {(item.price * item.quantity).toLocaleString()}đ
                    </span>
                  </div>
                ))}
              </div>

              <h4 className="invoice-total">
                Tổng: {selectedInvoice.totalAmount.toLocaleString()}đ
              </h4>

              <p>
                Thanh toán:{" "}
                <b>
                  {renderStatus(selectedInvoice.paymentStatus)}
                </b>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}