export default function SubscribeAndSocialLinks() {
  return (
    <div>
      <h5>Stay Connected</h5>
      <p>Subscribe to our newsletter for the latest updates on new flavors and offers.</p>
      <form className="mb-3" onSubmit={(e) => e.preventDefault()}>
        <input type="email" className="form-control mb-2" placeholder="Your Email" required />
        <button className="btn btn-light px-4" type="submit">Subscribe</button>
      </form>
      <div>
        <a href="#" className="text-white me-3"><i className="fab fa-facebook-f" /></a>
        <a href="#" className="text-white me-3"><i className="fab fa-instagram" /></a>
        <a href="#" className="text-white me-3"><i className="fab fa-twitter" /></a>
        <a href="#" className="text-white"><i className="fab fa-youtube" /></a>
      </div>
    </div>
  );
}
