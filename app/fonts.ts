import localFont from 'next/font/local'

// Font files can be colocated inside of `pages`
export const gilroy = localFont({
    src: [
        {
            path: '../public/fonts/gilroy-regular.woff2',
            weight: '400'
        },
        {
            path: '../public/fonts/gilroy-bold.woff2',
            weight: '600'
        },
        // {
        //     path: '../public/fonts/gilroy-extra-bold.woff2',
        //     weight: '700'
        // }
    ],
    variable: '--font-gilroy'
})
