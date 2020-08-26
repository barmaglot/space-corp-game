import React from 'react';
import { observer } from 'mobx-react';
import './styles.css';
import gameStore from 'App/store/game.store';
import Business from '../Business/Business';

const Businesses = observer(() => {
    const items = gameStore.businesses.map(item => {
        return <Business model={item} key={item.name} />;
    });

    return <div className="businesses-container">{items}</div>;
});

export default Businesses;
