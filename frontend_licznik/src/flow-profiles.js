const tap = () => {
    return 0.00027;
};

const washingMachine = (time) => {
    return Math.abs(Math.cos((time + 8) * 3 / 8)) * 0.00032;
};

const dishWashingMachine = (time) => {
    return Math.abs(Math.cos((time % 7) / 3)) * 0.00032;
};

const shower = (time) => {
    return Math.abs(Math.cos(time/3)) * 0.00029;
};

export const flowProfiles = {tap, washingMachine, dishWashingMachine, shower};
