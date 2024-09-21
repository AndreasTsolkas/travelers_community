type Properties = {
    name: string;
    number: number;
    getEndpointUrl: string;
};

export const suggestionsMethods: Properties[] = [
    { name: "Place", number: 1, getEndpointUrl: '/places' },
    { name: "Country", number: 2, getEndpointUrl: '/countries' },
    { name: "Current year", number: 3, getEndpointUrl: '/currentyear' }
];