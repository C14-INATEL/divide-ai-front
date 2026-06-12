import { useState, useEffect } from "react";
import { Plus, Users } from "lucide-react";
import { getGroups } from "../../../data/services/group-service/group.service";
import type { Group } from "../../../data/services/group-service/group.service";

export function Home() {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    getGroups()
      .then((data) => setGroups(Array.isArray(data) ? data : []))
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
                <p className="mt-2 font-medium text-base-content/60">
                  {group.members.length === 1
                    ? "1 membro"
                    : `${group.members.length} membros`}
                </p>

                <p className="mt-2 font-medium text-gray-500">
                  Visualizar detalhes
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}