import React from 'react';
import { observer } from 'mobx-react';
import './styles.css';
import { formatAmount } from 'App/utils/utils';
import transport from 'App/assets/icon-transport.png';
import uiStore from 'App/store/ui.store';

const GreetingsMessage = observer(() => {
    return (
        <div className="greetings-message">
            <div className="greetings-icon">
                <img src={transport} alt="greetings" />
            </div>
            <div className="greetings-title">Greetings!</div>
            <div>You were out for {uiStore.timeWereOut}</div>
            <div>Collected ${formatAmount(uiStore.collectedSinceLastVisit)}</div>
        </div>
    );
});

export default GreetingsMessage;
