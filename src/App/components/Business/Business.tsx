import React from 'react';
import './styles.css';
import BusinessModel from 'App/models/business.model';
import { observer } from 'mobx-react';
import { formatAmount, toggleClassName } from 'App/utils/utils';
import uiStore from 'App/store/ui.store';
import Button from '../Button/Button';
import icons from 'App/utils/icons';

const Business = observer(({ model }: BusinessProps) => {
    const progressStyle = { width: Math.round(model.progress) + '%' };
    const showInfiniteProgress = model.isManagerAssigned || model.progress !== 0;
    const managerIconClassName = toggleClassName(
        'brdr business-manager',
        model.isManagerAssigned,
        'assigned'
    );
    const buyBussinessClassName = toggleClassName('business-buy', model.upgradePossible, 'active');

    const managerIcon = icons.find(icon => {
        if (model.isManagerAssigned) {
            return icon.name === model.manager?.icon;
        } else {
            return icon.name === 'icon-nomanager';
        }
    })?.icon;

    return model.level ? (
        <div className="business-container brdr">
            <div className="business-icon brdr" onClick={model.collect.bind(model)}>
                <img src={model.icon} alt={model.name} />
                <div className="business-level">{model.level}</div>
            </div>
            <div className={managerIconClassName} onClick={() => uiStore.openManagersPopup(model)}>
                <img src={managerIcon} alt="manager" />
            </div>
            <Button
                className="business-upgrade"
                disabled={!model.upgradePossible}
                onClick={model.upgrade.bind(model)}>
                Upgrade
                <br />${formatAmount(model.upgradeCost)}
            </Button>
            <div className="business-progress-container">
                <div className="business-progress-wraper">
                    {model.increment < 10 ? (
                        <div className="business-progress" style={progressStyle}></div>
                    ) : (
                        showInfiniteProgress && (
                            <div className="business-infinite-progress">
                                <div className="line"></div>
                                <div className="subline inc"></div>
                                <div className="subline dec"></div>
                            </div>
                        )
                    )}
                    <div className="business-income">${formatAmount(model.income)}</div>
                </div>
                <div className="business-remaining">{model.timeRemaining}</div>
            </div>
        </div>
    ) : (
        <div className={buyBussinessClassName} onClick={model.upgrade.bind(model)}>
            <div className="business-buy-title">
                Buy {model.name} for ${formatAmount(model.upgradeCost)}
            </div>
        </div>
    );
});

interface BusinessProps {
    model: BusinessModel;
}

export default Business;
