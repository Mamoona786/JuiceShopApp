"use client";
export default function ProgressSteps({ current = 1 }) {
  const steps = [
    { id: 1, label: "Checkout Details" },
    { id: 2, label: "Payment Details" },
    { id: 3, label: "Order Confirmation" },
  ];

  return (
    <div className="container mb-4">
      <div className="d-flex align-items-center justify-content-center" style={{ gap: 12 }}>
        {steps.map((s, i) => {
          const active = s.id === current;
          const complete = s.id < current;
          return (
            <div key={s.id} className="d-flex align-items-center">
              <div
                className="d-flex flex-column align-items-center"
                style={{ minWidth: 140, textAlign: "center" }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: active || complete ? "#ff66b2" : "#ffd6e6",
                    color: active || complete ? "#fff" : "#444",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  {s.id}
                </div>
                <small
                  className="mt-2"
                  style={{
                    fontWeight: active ? 700 : 500,
                    color: active ? "#ff66b2" : "#666",
                  }}
                >
                  {s.label}
                </small>
              </div>

              {i < steps.length - 1 && (
                <div
                  style={{
                    width: 80,
                    height: 4,
                    background:
                      complete ? "#ff66b2" : "#ffd6e6",
                    margin: "0 8px",
                    borderRadius: 2,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
