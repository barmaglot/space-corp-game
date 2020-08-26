import { observable } from 'mobx';
import BusinessModel from '../models/business.model';
import { limitLoop } from 'App/utils/utils';
import config, { businessesConfig, managersConfig } from 'App/config';
import ManagerModel from 'App/models/manager.model';
import uiStore from './ui.store';
import BusinessStates from 'App/models/business.states';

class GameStore {
    @observable balance: number = config.STARTING_BALANCE;
    @observable businesses: Array<BusinessModel>;
    @observable managers: Array<ManagerModel>;

    constructor() {
        let savedData: SavedData;
        let businessCfg: any;

        savedData = JSON.parse(localStorage.getItem('savedData') as string);

        if (savedData) {
            businessCfg = savedData.businesses;
        } else {
            businessCfg = businessesConfig;
        }

        this.businesses = (businessCfg as Array<object>).map(item => new BusinessModel(item));
        this.managers = managersConfig;

        this.checkIdleState(savedData);

        limitLoop(this.update.bind(this), config.FPS);

        window.addEventListener('unload', this.save.bind(this));
    }

    private update() {
        this.businesses.forEach(item => {
            item.update();
        })
    }

    private save() {
        const data: SavedData = {
            balance: gameStore.balance,
            businesses: gameStore.businesses.map(item => item.getCurrentDataState()),
            timestamp: new Date()
        }
        localStorage.setItem('savedData', JSON.stringify(data));
    }

    private checkIdleState(savedData: SavedData) {
        if (savedData) {
            const idleSeconds = this.calculateIdleSeconds(savedData.timestamp);
            const idleIncome = this.calculateIdleIncome(idleSeconds);

            this.balance = savedData.balance + idleIncome;

            uiStore.openGreetingsPopup(idleSeconds, idleIncome);
        }
    }

    private calculateIdleSeconds(timestamp: Date): number {
        return (new Date().getTime() - new Date(timestamp).getTime()) / 1000;
    }

    private calculateIdleIncome(idleSeconds: number): number {
        let income = 0;

        this.businesses.forEach(item => {
            if (item.manager || item.progress) {
                let idleProgress = item.progress + (idleSeconds * config.FPS * item.increment);

                if (item.manager) {
                    item.progress = idleProgress % 100;
                    income += Math.floor(idleProgress / 100) * item.income;
                } else if (idleProgress > 100) {
                    item.progress = 0;
                    item.state = BusinessStates.Idle;
                    income += item.income;
                } else {
                    item.progress = idleProgress;
                }
            }
        });

        return income;
    }

}

interface SavedData {
    balance: number;
    businesses: any[];
    timestamp: Date;
}

const gameStore = new GameStore();

export default gameStore;
