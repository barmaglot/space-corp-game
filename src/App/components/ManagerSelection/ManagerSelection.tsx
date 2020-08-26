import React, { ReactNode } from 'react';
import './styles.css';
import { observer } from 'mobx-react';
import gameStore from 'App/store/game.store';
import Manager from '../Manager/Manager';
import uiStore from 'App/store/ui.store';

const ManagerSelection = observer(() => {
    const assignedManager = uiStore.selectedBusinessModel?.manager;
    const managers: Array<ReactNode> = [];

    gameStore.managers.forEach(item => {
        const alreadyAssigned = gameStore.businesses.find(model => {
            return model.manager?.name === item.name;
        });
        if (item.name !== assignedManager?.name && !alreadyAssigned) {
            managers.push(<Manager key={item.name} model={item} />);
        }
    });

    return (
        <div className="managers-container">
            <div className="managers-title">
                Select manager for {uiStore.selectedBusinessModel?.name}
            </div>
            {assignedManager && (
                <div className="managers-assigned">
                    <Manager model={assignedManager || managers[0]} isAssigneddManager={true} />
                </div>
            )}
            <div className="managers-list brdr-inset">{managers}</div>
        </div>
    );
});

export default ManagerSelection;
