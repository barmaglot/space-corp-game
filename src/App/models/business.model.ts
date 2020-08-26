import gameStore from "App/store/game.store";
import BusinessStates from "./business.states";
import { observable, computed } from "mobx";
import config, { managersConfig } from "App/config";
import { secondsToTime, roundNum } from "App/utils/utils";
import ManagerModel from "./manager.model";
import icons from "App/utils/icons";

class BusinessModel {
    public name: string;
    public icon: any;
    @observable public level: number;
    @observable public upgradeCost: number;
    @observable public baseIncome: number;
    @observable public baseIncrement: number;
    @observable public progress: number = 0;
    @observable public isManagerAssigned: boolean = false;
    public manager: ManagerModel | null = null;
    public state: BusinessStates = BusinessStates.Idle;

    private iconName: string;
    private levelMultiplier: number;
    private upgradeCostMultiplier: number;

    constructor(options: any) {
        this.name = options.name;
        this.level = options.level;
        this.baseIncrement = options.baseIncrement ? options.baseIncrement : (100 / options.speed) / config.FPS;
        this.baseIncome = options.baseIncome;
        this.upgradeCost = options.upgradeCost;
        this.levelMultiplier = options.levelMultiplier;
        this.upgradeCostMultiplier = options.upgradeCostMultiplier;
        this.iconName = options.iconName;
        this.icon = icons.find(icon => icon.name === options.iconName)?.icon;
        this.manager = managersConfig.find(item => item.name === options.managerName) || null;
        this.isManagerAssigned = !!this.manager;
        this.progress = options.progress || 0;
        this.state = this.progress ? BusinessStates.Collecting : BusinessStates.Idle;
    }

    public update() {
        switch (this.state) {
            case BusinessStates.Collecting:
                this.collecting();
                break;
            case BusinessStates.Idle:
                if (this.isManagerAssigned) {
                    this.state = BusinessStates.Collecting;
                }
                break;
            default:
                break;
        }
    }

    public collect() {
        this.state = BusinessStates.Collecting;
    }

    public upgrade() {
        if (!this.upgradePossible) {
            return;
        }

        gameStore.balance = roundNum(gameStore.balance - this.upgradeCost);
        this.income = roundNum(this.income * this.levelMultiplier);
        this.upgradeCost = roundNum(this.upgradeCost * this.upgradeCostMultiplier);
        this.level++;

        // double speed on each 10th level
        if (this.level % 10 === 0) {
            this.increment *= 2;
            this.finishCollecting();
        }
    }

    public assignManager(managerModel: ManagerModel) {
        this.isManagerAssigned = true;
        this.manager = managerModel;
        gameStore.balance -= managerModel.cost;
    }

    private collecting() {
        if (this.progress < 100) {
            this.progress = Math.min(this.progress + this.increment, 100);
        } else {
            this.finishCollecting();
        }
    }

    private finishCollecting() {
        // rounding here to avoid 0.1 + 0.2 problem
        gameStore.balance = roundNum(gameStore.balance + this.income);
        this.progress = 0;
        this.state = BusinessStates.Idle;
    }

    set increment(num: number) {
        this.baseIncrement = num;
    }

    set income(num: number) {
        this.baseIncome = num;
    }

    get increment(): number {
        return this.manager ? this.baseIncrement * this.manager.speed : this.baseIncrement;
    }

    get income(): number {
        return this.manager ? this.baseIncome * this.manager.income : this.baseIncome;
    }

    @computed get timeRemaining(): string {
        let remaining = ((100 - this.progress) / this.increment) / config.FPS;
        // Math.floor here to show 00:00:00 if speed less then one second
        remaining = Math.floor(remaining);
        return secondsToTime(remaining);
    }

    @computed get upgradePossible(): boolean {
        return gameStore.balance >= this.upgradeCost && this.level < config.MAX_LEVEL;
    }

    public getCurrentDataState(): object {
        return {
            name: this.name,
            level: this.level,
            baseIncrement: this.baseIncrement,
            baseIncome: this.baseIncome,
            upgradeCost: this.upgradeCost,
            upgradeCostMultiplier: this.upgradeCostMultiplier,
            levelMultiplier: this.levelMultiplier,
            iconName: this.iconName,
            progress: this.progress,
            managerName: this.manager?.name,
        }
    }
}

export default BusinessModel;
