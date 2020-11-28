const tap = () => {
    return 20;
};

const washingMachine = (time) => {
    return Math.cos(4/3 * Math.PI * time / 1000 - (Math.PI)) + 1;
};

export const flowProfiles = {tap, washingMachine};
