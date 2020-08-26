import React from 'react';
import './styles.css';
import ManagerModel from 'App/models/manager.model';
import { formatAmount, toggleClassName } from 'App/utils/utils';
import gameStore from 'App/store/game.store';
import Button from '../Button/Button';
import uiStore from 'App/store/ui.store';
import icons from 'App/utils/icons';

const Manager = ({ model, isAssigneddManager = false }: ManagerProps) => {
    const containerClassName = toggleClassName(
        'manager-container brdr',
        isAssigneddManager,
        'manager-assigned'
    );

    const icon = icons.find(icon => icon.name === model.icon)?.icon;

    return (
        <div className={containerClassName}>
            <div className="manager-icon brdr">
                <img src={icon} alt={model.name} />
            </div>
            <div>
                <div className="manager-name">{model.name}</div>
                <ul className="manager-stats">
                    <li>Income: x{model.income}</li>
                    <li>Speed: x{model.speed}</li>
                </ul>
            </div>
            {!isAssigneddManager && (
                <Button
                    className="manager-buy"
                    disabled={gameStore.balance <= model.cost}
                    onClick={() => {
                        uiStore.selectedBusinessModel?.assignManager(model);
                        uiStore.closeManagersPopup();
                    }}>
                    Buy
                    <br />${formatAmount(model.cost)}
                </Button>
            )}
        </div>
    );
};

interface ManagerProps {
    model: ManagerModel;
    isAssigneddManager?: boolean;
}

export default Manager;
