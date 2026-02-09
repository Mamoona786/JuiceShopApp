"use client";

export default function PaymentMethodCard({
  id,
  title,
  icon,
  description,
  checked,
  onChange
}) {
  return (
    <div
      className={`card mb-2 border-0 ${checked ? 'border-pink' : ''}`}
      style={{
        cursor: 'pointer',
        border: checked ? '2px solid #ff66b2' : '1px solid #dee2e6',
        transition: 'all 0.2s ease'
      }}
      onClick={onChange}
    >
      <div className="card-body">
        <div className="d-flex align-items-center">
          <input
            type="radio"
            className="form-check-input me-3"
            checked={checked}
            onChange={onChange}
            style={{ cursor: 'pointer' }}
          />
          <div>
            <div className="d-flex align-items-center">
              <i className={`fas ${icon} me-2 text-pink`}></i>
              <h6 className="mb-0">{title}</h6>
            </div>
            <small className="text-muted">{description}</small>
          </div>
        </div>
      </div>
    </div>
  );
}
