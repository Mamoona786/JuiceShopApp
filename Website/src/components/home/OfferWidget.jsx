import Image from "next/image";
import CountdownTimer from "@/components/CountdownTimer";

export default function OfferWidget() {
  return (
    <div className="offer-widget bg-light p-3 rounded shadow mt-3">
      <h2 className="offer-title mb-3 text-center">Limited Time Offer!</h2>
      <p className="offer-text text-center mb-3">Get 50% off on all fresh juices. Do not miss out on our best deals of the season.</p>
      <Image src="/images/green-detox.jpg" className="img-fluid rounded my-3" alt="Limited Time Offer" width={800} height={600} />
      <div className="countdown-timer text-center my-3 fw-bold display-6"><CountdownTimer endDateISO="2025-12-31T23:59:59" /></div>
      <a href="#" className="btn btn-warning w-100 py-2 fw-bold">Shop Now</a>
    </div>
  );
}
