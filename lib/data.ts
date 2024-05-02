import {
    StoreDataTypes,
    PlansProps,
    QuotaProps,
    ComparePlansProps
} from "@/types/type"

export const StoreData: StoreDataTypes[] = [
    {
        src: '/initial/1.jpg',
        title: 'Title 1'
    },
    {
        src: '/initial/2.jpg',
        title: 'Title 2'
    },
    {
        src: '/initial/3.jpg',
        title: 'Title 3'
    },
    {
        src: '/initial/4.jpg',
        title: 'Title 4'
    },
    {
        src: '/initial/5.jpg',
        title: 'Title 5'
    },
]

export const plans: PlansProps[] = [
    {
        name: 'MICRO',
        bandwidth: '500MB',
        price: 4.99
    },
    {
        name: 'PRO',
        description: 'MOST POPULAR',
        bandwidth: '2 GB',
        price: 9.99
    },
    {
        name: 'ADVANCED',
        bandwidth: '5 GB',
        price: 19.99
    }
]

export const quotas: QuotaProps[] = [
    {
        title: 'Premium',
        bandwidth: '15 GB',
        pay: "39.99"
    },
    {
        title: 'Plus',
        bandwidth: '50 GB',
        pay: "79.99"
    },
    {
        title: 'Enterprise',
        bandwidth: '100 GB',
        pay: "149.99"
    }
]

export const compare:ComparePlansProps[] = [
    {
        feature:'Quota',
        free:'25 MB(one-time)',
        paid:'from 500 MB (monthly)'
    },
    {
        feature:'Check new images*',
        free:'every 24 hours',
        paid:'Instant*'
    },
    {
        feature:'30 days backup',
        free:'',
        paid:''
    },
    {
        feature:'Compress Product Images',
        free:'',
        paid:''
    },
    {
        feature:'Manual uploads',
        free:'',
        paid:''
    },
    {
        feature:'Automatic Compression',
        free:'',
        paid:''
    },
    {
        feature:'Batch Actions',
        free:'',
        paid:''
    },
    {
        feature:'Product Image File Rename',
        free:'',
        paid:''
    },
    {
        feature:'Product Image ALT Tag Rename',
        free:'',
        paid:''
    },
    {
        feature:'Compress Asset Images',
        free:'',
        paid:''
    },
    {
        feature:'Priority Support',
        free:'',
        paid:''
    },
]