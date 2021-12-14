export const COLUMNS = [
    {
        Header: 'Rank',
        accessor:'market_cap_rank'
    },
    {
        Header: 'Image',
        accessor:'image',
        Cell: tableProps => (
        <img
            src={tableProps.row.original.image}
            width={30}
            alt="Img"
        />
        )
    },
    {
        Header: 'Name',
        accessor:'name'
    },
    {
        Header: 'Price',
        accessor:'current_price'
    },

    {
        Header:'Highest',
        accessor:'high_24h'
    },
    {
        Header:'Lowest',
        accessor:'low_24h'
    },
    {
        Header:'Price change',
        accessor:'price_change_24h'
    },
]