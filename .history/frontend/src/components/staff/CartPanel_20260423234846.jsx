import { createOrder } from "../../services/order.service";

const handleCheckout = async (orderData) => {
  try {
    if (!orderData.table) {
      alert("Chọn bàn trước!");
      return;
    }

    const payload = {
      table: orderData.table,
      customer: orderData.customer,
      items: cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      total: cart.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      ),
    };

    const res = await createOrder(payload);

    console.log("CREATED ORDER:", res.data);

    alert("Thanh toán thành công!");
    setCart([]);

  } catch (err) {
    console.error("Checkout error:", err);
    alert("Lỗi thanh toán!");
  }
};