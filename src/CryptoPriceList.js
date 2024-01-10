import React, { useState, useEffect } from 'react';

function CryptoPriceList() {
    const [cryptoData, setCryptoData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [coinsPerPage, setCoinsPerPage] = useState(100);
    const [budget, setBudget] = useState('');
    const [selectedCoin, setSelectedCoin] = useState('');
    const [coinQuantity, setCoinQuantity] = useState(null);

    useEffect(() => {
        fetch('https://api.coinpaprika.com/v1/tickers')
            .then(response => response.json())
            .then(data => {
                setCryptoData(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                setIsLoading(false);
            });
    }, []);

    const indexOfLastCoin = currentPage * coinsPerPage;
    const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
    const currentCoins = cryptoData.slice(indexOfFirstCoin, indexOfLastCoin);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const totalCoins = cryptoData.length;
    const totalPages = Math.ceil(totalCoins / coinsPerPage);

    const handleBudgetChange = (e) => {
        setBudget(e.target.value);
        calculateQuantity(e.target.value, selectedCoin);
    };

    const handleCoinChange = (e) => {
        setSelectedCoin(e.target.value);
        calculateQuantity(budget, e.target.value);
    };

    const calculateQuantity = (budget, coinId) => {
        if (!budget || !coinId) {
            setCoinQuantity(null);
            return;
        }
        const coin = cryptoData.find(c => c.id === coinId);
        if (coin) {
            const quantity = budget / coin.quotes.USD.price;
            setCoinQuantity(quantity);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const startPage = Math.max(currentPage - 5, 1);
        const endPage = Math.min(currentPage + 5, totalPages);

        if (startPage > 1) {
            pageNumbers.push(1, '...');
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        if (endPage < totalPages) {
            pageNumbers.push('...', totalPages);
        }

        return pageNumbers.map(number => (
            number === '...' ? 
                <span key={number}>...</span> : 
                <button key={number} onClick={() => paginate(number)}>
                    {number}
                </button>
        ));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Crypto Prices</h1>
            <div>
                <label>
                    Budget ($):
                    <input type="number" value={budget} onChange={handleBudgetChange} />
                </label>
                <label>
                    Choose a cryptocurrency:
                    <select value={selectedCoin} onChange={handleCoinChange}>
                        <option value="">Select Coin</option>
                        {cryptoData.map(coin => (
                            <option key={coin.id} value={coin.id}>
                                {coin.name}
                            </option>
                        ))}
                    </select>
                </label>
                {coinQuantity !== null && (
                    <p>
                        You can buy approximately {coinQuantity.toFixed(6)} units of {selectedCoin}.
                    </p>
                )}
            </div>
            <ul>
                {currentCoins.map(coin => (
                    <li key={coin.id}>
                        {coin.name} ({coin.symbol}): ${coin.quotes.USD.price.toFixed(2)}
                    </li>
                ))}
            </ul>
            <div>
                {renderPageNumbers()}
            </div>
        </div>
    );
}

export default CryptoPriceList;
