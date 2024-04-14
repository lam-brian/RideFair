import "./spinner.css";

export default function Spinner() {
  return (
    <div className="lds-roller text-blue-300">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
