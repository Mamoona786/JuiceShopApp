export default function CategoryTab({ children, active = false, id }) {
  return (
    <div className={`tab-pane fade ${active ? "show active" : ""}`} id={id} role="tabpanel" aria-labelledby={`${id}-tab`}>
      {children}
    </div>
  );
}
