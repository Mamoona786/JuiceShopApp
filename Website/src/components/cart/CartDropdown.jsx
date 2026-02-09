"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CartDropdown() {
  const router = useRouter();
  const { items, subtotal, totalItems } = useCart();
  const has = items.length > 0;

  const goToCart = (e) => {
    e.preventDefault();
    router.push("/cart");
  };

  const goToCheckout = (e) => {
    e.preventDefault();
    router.push("/checkout");
  };

  return (
    <li className="nav-item dropdown me-4">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id="cartDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="fas fa-shopping-cart" /> Cart (<span id="cartCount">{totalItems}</span>)
      </a>
      <div className="dropdown-menu p-1 cart-table" aria-labelledby="cartDropdown">
        <div className="dropdown-cart">
          <table>
            <thead>
              <tr><th>Image</th><th>Product</th><th>Qty</th><th>Price</th><th>Total</th></tr>
            </thead>
            <tbody id="cartItems">
              {has ? (
                <>
                  {items.map((i) => (
                    <tr key={i.id}>
                      <td><Image src={i.thumbnail} alt={i.name} width={40} height={40} style={{ borderRadius: 4 }} /></td>
                      <td>{i.name}</td>
                      <td>{i.quantity}</td>
                      <td>{i.price}</td>
                      <td>{i.price * i.quantity}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={5} className="text-end fw-semibold">Subtotal. Rs. {subtotal}</td>
                  </tr>
                  <tr>
                    <td colSpan={5} className="text-right">
                      <button className="btn-info" onClick={goToCart}>View Cart</button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5} className="text-right">
                      <button className="btn-success" onClick={goToCheckout}>Checkout</button>
                    </td>
                  </tr>
                </>
              ) : (
                <tr><td colSpan={5} className="text-center">Your Cart is empty</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </li>
  );
}
