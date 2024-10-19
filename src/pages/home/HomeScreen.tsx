import React, { useState, useEffect } from 'react';
import {View, Text, Button, StyleSheet,TouchableOpacity, Animated, Easing} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useGetMemoryCardsQuery } from '../../utility/api/cardsApi';
import { is_null } from '../../utility/functions';
import { cardType } from '../../utility/constants/types';
import useTimer from '../../utility/hooks/useTimer';
import { useTranslation } from 'react-i18next';

const App = () => {

  const {t}=useTranslation()
  const { data, error, isLoading } = useGetMemoryCardsQuery()
  const [cards, setCards] = useState<cardType[]>([]);
  const [selectedCards, setSelectedCards] = useState<cardType[]>([]);
  const [matches, setMatches] = useState(0);
  const [winMessage, setWinMessage] = useState(new Animated.Value(0));
  const [gameWon, setGameWon] = useState(false);
  const { time, startTimer, stopTimer } = useTimer()
  
  useEffect(()=>{
    if(data?.length){
      const rebasedData=gameCardsFunction(data)
      setCards(rebasedData)
    }
  },[data])

  useEffect(()=>{
    if(selectedCards.length>0 && time == 0){
      startTimer()
    }
  },[selectedCards])

    const cardClickFunction = (card:cardType) => {

        if ( !gameWon && selectedCards.length < 2 && !card.isFlipped ) {
            const updatedSelectedCards = [...selectedCards, card];
            const updatedCards =cards.map((c:cardType) => c.id === card.id ? { ...c, isFlipped: true } : c );

            setSelectedCards(updatedSelectedCards);
            setCards(updatedCards);
            if (updatedSelectedCards.length === 2) {
                if (updatedSelectedCards[0].symbol === updatedSelectedCards[1].symbol) {
                    setMatches(matches + 1);
                    setSelectedCards([]);
                    if (matches + 1 === cards.length / 2) {
                        geekWinGameFunction();
                        setGameWon(true);
                    }
                } else {
                    setTimeout(() => {
                        const flippedCards =
                            updatedCards.map((c) =>
                                updatedSelectedCards.some((s) =>
                                    s.id === c.id) ?
                                    { ...c, isFlipped: false } : c
                            );
                        setSelectedCards([]);
                        setCards(flippedCards);
                    }, 1000);
                }
            }
        }

    };

    const geekWinGameFunction = () => {
        Animated.timing(winMessage, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
        if (matches === cards.length / 2 && cards.length>0) {          
            geekWinGameFunction();
            setGameWon(true);
        }
    }, [matches]);

    const reset=()=>{
      setCards(gameCardsFunction(data??[]));
      setSelectedCards([]);
      setMatches(0);
      setWinMessage(new Animated.Value(0));
      setGameWon(false);
      stopTimer()
    }
    const WiningOverlay=()=>(
      <View style={styles.winMessage}>
          <View style={styles.winMessageContent}>
              <Text style={styles.winText}>
                  {t("Congratulations")}
              </Text>
              <Text style={styles.winText}>{t("You Won")}!</Text>
          </View>
          <Button
              title={t("Restart")}
              onPress={reset}
          />
      </View>
    )

    const CardItem=({card}:{card:cardType})=>(
      <TouchableOpacity
          key={card.id}
          style={[styles.card,card.isFlipped && styles.cardFlipped]}
          onPress={() => cardClickFunction(card)}
      >
          {card.isFlipped ? <Icon name={card.symbol} size={40} style={styles.cardIcon} /> : null}
      </TouchableOpacity>
    )

    if(isLoading){return null}

    return (
        <View style={styles.container}>
            <Text style={styles.header1}>
                {t("Memory Game")}
            </Text>
            <Text style={styles.header2}>
                {t("Lernova Task")}
            </Text>
            <View style={styles.logger}>
              <Text style={styles.matchText}>{t("Matches")} : {matches} / {cards.length / 2}</Text>
              <Text style={styles.matchText}>{time}</Text>
            </View>
            {gameWon ? (
                <WiningOverlay/>
            ) : (
                <View style={styles.grid}>
                    {cards.map((card) => (
                        <CardItem key={card.id} card={card}/>
                    ))}
                </View>
            )}
        </View>
    );
};

const randomArrFunction = (arr:string[]) => {
  const newArr=[...arr]
    for (let i = newArr.length - 1; i > 0; i--) {
        const j =
            Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

const gameCardsFunction = (icons:string[]) => {
  if(!is_null(icons)){
    const randomIcons =randomArrFunction(icons);
      return randomIcons.map((icon, index:number) => ({
              id: index,
              symbol: icon,
              isFlipped: false,
          }))
    }
    return []
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    header1: {
        fontSize: 36,
        marginBottom: 10,
        color: 'green',
    },
    header2: {
        fontSize: 18,
        marginBottom: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    matchText: {
        fontSize: 18,
        color: 'black',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    card: {
        width: 80,
        height: 80,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0c4a6e',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
    },
    cardFlipped: {
        backgroundColor: 'white',
    },
    cardIcon: {
        color: 'blue',
    },
    winMessage: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    winMessageContent: {
        backgroundColor: '#0c4a6e',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    winText: {
        fontSize: 36,
        color: 'white',
    },
    logger:{
      flexDirection:'row',
      justifyContent:'space-between',
      width:'100%',
      paddingHorizontal:25,
      marginBottom:10
    }
});
export default App;
