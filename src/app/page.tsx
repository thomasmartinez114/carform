'use client';

import { useState } from 'react';
import { Car } from '@/types/car';
import CarForm from '@/components/CarForm';
import CarTable from '@/components/CarTable';
import CarGrid from '@/components/CarGrid';

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  const handleAddCar = (carData: Omit<Car, 'id'>) => {
    const newCar: Car = {
      ...carData,
      id: Math.random().toString(36).substr(2, 9),
    };
    setCars([...cars, newCar]);
  };

  const handleEditCar = (car: Car) => {
    setEditingCar(car);
  };

  const handleUpdateCar = (carData: Omit<Car, 'id'>) => {
    if (editingCar) {
      const updatedCars = cars.map((car) =>
        car.id === editingCar.id ? { ...carData, id: car.id } : car
      );
      setCars(updatedCars);
      setEditingCar(null);
    }
  };

  const handleDeleteCar = (id: string) => {
    setCars(cars.filter((car) => car.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Car Inventory</h1>
      
      {editingCar ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Edit Car</h2>
          <CarForm
            onSubmit={handleUpdateCar}
            initialData={editingCar}
            buttonText="Update Car"
          />
          <button
            onClick={() => setEditingCar(null)}
            className="mt-4 text-gray-600 hover:text-gray-900"
          >
            Cancel Editing
          </button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Add New Car</h2>
          <CarForm onSubmit={handleAddCar} />
        </>
      )}

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Car List</h2>
          <div className="space-x-2">
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 rounded ${
                viewMode === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded ${
                viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              Grid View
            </button>
          </div>
        </div>

        {viewMode === 'table' ? (
          <CarTable cars={cars} onEdit={handleEditCar} onDelete={handleDeleteCar} />
        ) : (
          <CarGrid cars={cars} onEdit={handleEditCar} onDelete={handleDeleteCar} />
        )}
      </div>
    </div>
  );
}
