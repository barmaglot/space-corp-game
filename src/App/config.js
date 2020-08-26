const config = {
    FPS: 60,
    ROUND_AMOUNT: 100,
    STARTING_BALANCE: 0,
    MAX_LEVEL: 100,
    DECIMAL_SEPARATOR: ',',
    POPUP_IDLE_SECONDS: 10,
};

const businessesConfig = [
    {
        name: 'Transport',
        level: 1,
        speed: 2,
        baseIncome: 100,
        upgradeCost: 100,
        upgradeCostMultiplier: 1.5,
        levelMultiplier: 1.1,
        iconName: 'icon-transport',
    },
    {
        name: 'Space Hotel',
        level: 0,
        speed: 6,
        baseIncome: 500,
        upgradeCost: 1000,
        upgradeCostMultiplier: 1.6,
        levelMultiplier: 1.1,
        iconName: 'icon-hotel',
    },
    {
        name: 'Guns Factory',
        level: 0,
        speed: 40,
        baseIncome: 5000,
        upgradeCost: 50000,
        upgradeCostMultiplier: 1.8,
        levelMultiplier: 1.2,
        iconName: 'icon-gun',
    },
    {
        name: 'Asteroid Mining',
        level: 0,
        speed: 180,
        baseIncome: 20000,
        upgradeCost: 200000,
        upgradeCostMultiplier: 1.8,
        levelMultiplier: 1.2,
        iconName: 'icon-asteroid',
    },
    {
        name: 'Dark Matter Mining',
        level: 0,
        speed: 720,
        baseIncome: 1000000,
        upgradeCost: 5000000,
        upgradeCostMultiplier: 2,
        levelMultiplier: 1.2,
        iconName: 'icon-darkmatter',
    },
];

const managersConfig = [
    {
        name: 'Carl',
        cost: 1000,
        speed: 1,
        income: 1,
        icon: 'icon-manager1',
    },
    {
        name: 'Samuel',
        cost: 20000,
        speed: 1.2,
        income: 1.2,
        icon: 'icon-manager2',
    },
    {
        name: 'John',
        cost: 100000,
        speed: 1.3,
        income: 1.3,
        icon: 'icon-manager3',
    },
    {
        name: 'Benjamin',
        cost: 1000000,
        speed: 1.5,
        income: 1.3,
        icon: 'icon-manager4',
    },
    {
        name: 'Liam',
        cost: 1000000,
        speed: 1.5,
        income: 1.3,
        icon: 'icon-manager5',
    },
    {
        name: 'William',
        cost: 1000000000,
        speed: 2,
        income: 1.5,
        icon: 'icon-manager6',
    },
    {
        name: 'Oliver',
        cost: 1000000000,
        speed: 1.5,
        income: 2,
        icon: 'icon-manager7',
    },
];

export default config;
export { businessesConfig, managersConfig };
