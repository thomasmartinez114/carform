import { Car } from '@/types/car';

interface CarGridProps {
  cars: Car[];
  onEdit: (car: Car) => void;
  onDelete: (id: string) => void;
}

export default function CarGrid({ cars, onEdit, onDelete }: CarGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {cars.map((car) => (
        <div key={car.id} className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">{car.make} {car.model}</h3>
          <p className="text-gray-600">Year: {car.year}</p>
          <p className="text-gray-600">Color: {car.color}</p>
          <div className="mt-4 space-x-2">
            <button
              onClick={() => onEdit(car)}
              className="text-blue-600 hover:text-blue-900"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(car.id)}
              className="text-red-600 hover:text-red-900"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 