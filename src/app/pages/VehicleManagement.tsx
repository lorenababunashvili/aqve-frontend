import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Plus, Edit2, Trash2, Car } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

interface Vehicle {
  id: number;
  name: string;
  licensePlate: string;
  type: string;
  color: string;
  isDefault: boolean;
}

export function VehicleManagement() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: 1,
      name: "Toyota Camry",
      licensePlate: "AA-000-AA",
      type: "car",
      color: "Blue",
      isDefault: true,
    },
    {
      id: 2,
      name: "Honda CBR",
      licensePlate: "BB-111-BB",
      type: "motorcycle",
      color: "Red",
      isDefault: false,
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    name: "",
    licensePlate: "",
    type: "car",
    color: "",
  });

  const handleAddVehicle = () => {
    const vehicle: Vehicle = {
      id: vehicles.length + 1,
      ...newVehicle,
      isDefault: vehicles.length === 0,
    };
    setVehicles([...vehicles, vehicle]);
    setNewVehicle({ name: "", licensePlate: "", type: "car", color: "" });
    setIsAddDialogOpen(false);
  };

  const handleSetDefault = (id: number) => {
    setVehicles(
      vehicles.map((v) => ({
        ...v,
        isDefault: v.id === id,
      }))
    );
  };

  const handleDelete = (id: number) => {
    setVehicles(vehicles.filter((v) => v.id !== id));
  };

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case "car":
        return "🚗";
      case "motorcycle":
        return "🏍️";
      case "truck":
        return "🚚";
      case "bus":
        return "🚌";
      default:
        return "🚗";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">My Vehicles</h1>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-[#17E9BB] hover:bg-[#074047]">
                <Plus className="w-4 h-4 mr-2" />
                Add Vehicle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Vehicle</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="vehicleName">Vehicle Name</Label>
                  <Input
                    id="vehicleName"
                    placeholder="e.g., Toyota Camry"
                    value={newVehicle.name}
                    onChange={(e) =>
                      setNewVehicle({ ...newVehicle, name: e.target.value })
                    }
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="licensePlate">License Plate</Label>
                  <Input
                    id="licensePlate"
                    placeholder="AA-000-AA"
                    value={newVehicle.licensePlate}
                    onChange={(e) =>
                      setNewVehicle({ ...newVehicle, licensePlate: e.target.value })
                    }
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="vehicleType">Vehicle Type</Label>
                  <Select
                    value={newVehicle.type}
                    onValueChange={(value) =>
                      setNewVehicle({ ...newVehicle, type: value })
                    }
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="car">Car</SelectItem>
                      <SelectItem value="motorcycle">Motorcycle</SelectItem>
                      <SelectItem value="truck">Truck</SelectItem>
                      <SelectItem value="bus">Bus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    placeholder="e.g., Blue"
                    value={newVehicle.color}
                    onChange={(e) =>
                      setNewVehicle({ ...newVehicle, color: e.target.value })
                    }
                    className="mt-1.5"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddVehicle}
                  disabled={
                    !newVehicle.name || !newVehicle.licensePlate || !newVehicle.color
                  }
                  className="bg-[#17E9BB] hover:bg-[#074047]"
                >
                  Add Vehicle
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Vehicles List */}
      <div className="px-4 py-6 space-y-4">
        {vehicles.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">No vehicles added</h3>
            <p className="text-gray-600 mb-6">Add your first vehicle to get started</p>
          </div>
        ) : (
          vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-2xl p-4 shadow-sm border-2 border-transparent hover:border-teal-200 transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Vehicle Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-blue-100 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                  {getVehicleIcon(vehicle.type)}
                </div>

                {/* Vehicle Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-gray-900 truncate">
                        {vehicle.name}
                      </h3>
                      <p className="text-sm text-gray-600">{vehicle.color}</p>
                    </div>
                    {vehicle.isDefault && (
                      <Badge className="bg-[#17E9BB] text-white flex-shrink-0">
                        Default
                      </Badge>
                    )}
                  </div>

                  <div className="bg-gray-50 px-3 py-2 rounded-lg inline-block mb-3">
                    <p className="font-mono font-semibold text-gray-900">
                      {vehicle.licensePlate}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {!vehicle.isDefault && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSetDefault(vehicle.id)}
                        className="h-8 text-xs"
                      >
                        Set as Default
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs"
                    >
                      <Edit2 className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(vehicle.id)}
                      className="h-8 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Info Card */}
      <div className="px-4 pb-24">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Quick Tip</h4>
          <p className="text-sm text-blue-700">
            Set a default vehicle to speed up your booking process. You can always change it when making a reservation.
          </p>
        </div>
      </div>
    </div>
  );
}