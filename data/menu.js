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
                to: '/finder/create'
            },
            {
                title: 'Saved Reports',
                to: '/finder',
            },
            {
                title: 'Keyword Explorer',
                to: '/finder/explorer',
            }
        ]
    },
    {
        title: 'Reviews Analyzer',
        icon: ['fas', 'star'],
        fontawesome: true,
        to: '/reviews-analyzer',
        subitems: [
            {
                title: 'Create New Analysis',
                to: '/reviews-analyzer/create'
            },
            {
                title: 'Saved Reports',
                to: '/reviews-analyzer'
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
