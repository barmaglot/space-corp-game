import React from 'react';
import { observer } from 'mobx-react';
import './styles.css';
import gameStore from 'App/store/game.store';
import { formatAmount } from 'App/utils/utils';

const Balance = observer(() => {
    return <div className="balance brdr">${formatAmount(gameStore.balance, 1000000000)}</div>;
});

export default Balance;
