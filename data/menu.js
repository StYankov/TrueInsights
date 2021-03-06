export default [
    {
        title: 'Home',
        icon: ['fas', 'home'],
        route: 'index',
        fontawesome: true,
        to: '/'

    },
    {
        title: 'Product Analyzer',
        icon: ['fas', 'signal'],
        fontawesome: true,
        route: 'product-analyzer',
        to: '/product-analyzer',
        subitems: [
            {
                title: 'Groups',
                to: '/product-groups'
            },
            {
                title: 'Settings',
                to: '/product-groups/settings'
            },
            {
                title: 'History',
                to: '/analyzer/history'
            }
        ]
    },
    {
        title: 'Score Card',
        icon: ['fas', 'chart-bar'],
        fontawesome: true,
        route: 'scorecard',
        to: '/scorecard'
    },
    {
        title: 'The Keyword Finder',
        icon: '/images/logo-icon.png',
        route: 'finder',
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
        title: 'Analytics',
        icon: ['fas', 'chart-line'],
        fontawesome: true,
        route: '#',
        to: '#',
        subitems: [
            {
                title: 'Product Content',
                to: '/analytics/product-content'
            },
            {
                title: 'Reviews',
                to: '/analytics/reviews'
            },
            {
                title: 'Share of search',
                to: '/analytics/share-of-search'
            },
            {
                title: 'Sponsored Search',
                to: '/analytics/sponsored-search'
            }
        ]
    },
    // {
    //     title: 'Reviews Analyzer',
    //     icon: ['fas', 'star'],
    //     fontawesome: true,
    //     route: 'reviews-analyzer',
    //     to: '/reviews-analyzer',
    //     subitems: [
    //         {
    //             title: 'Create New Analysis',
    //             to: '/reviews-analyzer/create'
    //         },
    //         {
    //             title: 'Saved Reports',
    //             to: '/reviews-analyzer'
    //         }
    //     ]
    // },
    // {
    //     title: 'Marketplace Analysis',
    //     icon: ['fas', 'chart-line'],
    //     fontawesome: true,
    //     route: 'analytics',
    //     to: '/analytics'
    // }
];
