import React from 'react';
import bg from './assets/bg.png';
import './App.css';
import Businesses from './components/Businesses/Businesses';
import Balance from './components/Balance/Balance';
import Popup from './components/Popup/Popup';
import { observer } from 'mobx-react';
import uiStore from 'App/store/ui.store';
import ManagerSelection from './components/ManagerSelection/ManagerSelection';
import GreetingsMessage from './components/GreetingsMessage/GreetingsMessage';

const App = observer(() => {
    return (
        <div className="App">
            <img src={bg} alt="bg" />
            <Balance />
            <Businesses />
            <Popup
                visible={uiStore.showManagersPopup}
                onClose={uiStore.closeManagersPopup.bind(uiStore)}>
                <ManagerSelection />
            </Popup>
            <Popup
                visible={uiStore.showGreetingsPopup}
                onClose={uiStore.closeGreetingsPopup.bind(uiStore)}>
                <GreetingsMessage />
            </Popup>
        </div>
    );
});

export default App;
