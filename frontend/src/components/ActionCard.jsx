export default function ActionCard({ title, description }) {
  return (
    <div className="bg-white p-4 shadow-sm rounded-xl hover:shadow-md transition cursor-pointer">
      <h4 className="font-semibold text-gray-700">{title}</h4>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
