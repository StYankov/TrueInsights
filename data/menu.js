export default [
    {
        title: 'Home',
        icon: ['fas', 'home'],
        fontawesome: true,
        to: '/'

    },
    {
        title: 'The Keyword Finder',
        icon: '/images/logo-icon.png',
        to: '/finder',
        subitems: [
            {
                title: 'New Keyword Report',
                link: '#',
                to: '/finder/create'
            },
            {
                title: 'Saved Reports',
                link: '/finder',
                to: '/finder',
            },
            {
                title: 'Missing Keywords',
                link: '#'
            }
        ]
    },
    {
        title: 'Marketplace Analysis',
        icon: ['fas', 'chart-line'],
        fontawesome: true,
        to: '#',
        subitems: [
            {
                title: 'Perfect KPI Dashboard',
                link: '#'
            },
            {
                title: 'Global Brand Content',
                link: '#'
            },
            {
                title: 'Share of Search',
                link: '#'
            },
            {
                title: 'Portfolio Abailability',
                link: '#'
            }
        ]
    }
];
