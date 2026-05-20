import { useState, useEffect } from "react";
import { Plus, Users } from "lucide-react";
import { getGroups } from "../../services/group.service";
import type { Group } from "../../services/group.service"; 

export function Home() {
  const [groups, setGroups] = useState<Group[]>([]);

 useEffect(() => {
    getGroups()
        .then((data) => {
            if (Array.isArray(data)) {
                setGroups(data);
            } else {
                setGroups([]); 
            }
        })
        .catch((error) => {
            console.error(error);
            setGroups([]); 
        });
}, []);

  return (
    <div className="p-4">
      <div className="hero bg-base-100 rounded-box mb-8 p-6 max-w-4xl mx-auto">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold">Divide Ai</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Meus Grupos</h2>
          <button className="btn btn-primary">
            <Plus size={20} /> Novo Grupo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map((group) => (
            <div
              key={group.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-base-300"
            >
              <div className="card-body">
                <h2 className="card-title flex items-center gap-2">
                  <Users size={20} className="text-primary" />
                  {group.name}
                </h2>
                <p
                  className={`mt-2 font-medium ${
                    group.value > 0 ? "text-error" : "text-success"
                  }`}
                >
                  {group.value > 0
                    ? `Você deve: R$ ${group.value.toFixed(2)}`
                    : "Tudo quite!"}
                </p>

                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-outline btn-sm">
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}