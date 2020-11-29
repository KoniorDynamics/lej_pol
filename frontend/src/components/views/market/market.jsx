import React, {useState} from 'react';
import './market.css';
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

const Market = () => {

    const [marketItems, setMarketItems] = useState([
        {
            price: 50,
            photoUrl: 'https://kozackadrogeria.pl/26577-large_default/vizir-pr27kg-kolor.jpg',
            title: 'Czadowy proszek do prania'
        },
        {
            price: 120,
            photoUrl: 'https://www.teesa.pl/userdata/public/gfx/c2940ae8a298a68c3b03a0d7d5df7b48.jpg',
            title: 'Niezwykłe żelazko'
        },
        {
            price: 30,
            photoUrl: 'https://www.francodex.com/media/cache/cms_gallery_640/uploads/content/adviceadvice/162/ee28b45edcabd11751699d63cc4b10ca.png',
            title: 'Pluszowy chomik'
        },
        {
            price: 15,
            photoUrl: 'https://static5.redcart.pl/templates/images/thumb/19412/1024/1024/pl/0/templates/images/products/19412/15eb37f488c2b3069c2745354845a9d1.png',
            title: 'Szczoteczka do zębów'
        },
        {
            price: 25,
            photoUrl: 'https://kinokameralnecafe.pl/wp-content/uploads/2018/11/bilet.png',
            title: 'Bilet do kina'
        },
        {
            price: 400000000,
            photoUrl: 'https://images.dealer.com/ddc/vehicles/2020/Lexus/IS%20300/Sedan/perspective/front-left/2020_24.png',
            title: 'Lexus IS 300'
        },
        {
            price: 40,
            photoUrl: 'https://e-fortnite.pl/images/weapons/white/machete.png',
            title: 'Maczeta'
        },
        {
            price: 80,
            photoUrl: 'https://smaczajama.pl/userdata/public/gfx/17514/183-zd1.jpg',
            title: 'Spoko Wódka'
        },

    ]);
    const [points, setPoints] = useState(70);

    const buyAnItem = (itemPrice) => {
        setPoints(points - itemPrice);
    };

    return (
        <>
            <div className="market-section">
                <p className='market-title'>Nagrody za oszczędzanie!</p>
                <p className="market-points">Twoje punkty: <b>{points}</b></p>
                {marketItems.map(
                    (marketItem, i) => {
                        return (
                            <Card className="market-item" key={i}>
                                <p className="market-item-title">{marketItem.title}</p>
                                <p className="market-item-price">{marketItem.price}</p>
                                <img className="market-item-photo" src={marketItem.photoUrl}/>
                                <Button onClick={() => {
                                    buyAnItem(marketItem.price);
                                }} disabled={marketItem.price > points} variant="contained" color="primary">Odbierz!</Button>
                            </Card>
                        )
                    }
                )}
            </div>
        </>
    );
};

export default Market;
