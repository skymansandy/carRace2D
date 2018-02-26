module Main where

import Prelude

import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log)
import Control.Monad.Eff.Random (RANDOM, randomInt)
import DOM (DOM)
import Data.Array ((..), filter, null, length)
import Data.Int (toNumber)
import Data.Number.Format (toString)
import Data.Traversable (traverse)
import FRP (FRP)
import FRP.Behavior.Keyboard (key)
import FRP.Event.Time (animationFrame)
import Game.DrawTools (drawCars)
import Game.Types (Car, State, MyCar)
import Game.Values (carSpeed, totalCars)
import PrestoDOM.Core (PrestoDOM)
import PrestoDOM.Elements (linearLayout, textView, relativeLayout)
import PrestoDOM.Properties (background, color, gravity, margin, height, name, orientation, text, textSize, width)
import PrestoDOM.Types (Length(..))
import PrestoDOM.Util (render)


--produce cars
getCars ::forall a. Int -> Eff(random :: RANDOM | a) Car
getCars a =
  randomInt 1 4 >>= \lane ->
    pure {id: ("c" <> (toString (toNumber a))), x: (200*lane)-175, y:450-(a*250)}

collided::MyCar -> Car -> Boolean
collided mycar opponent =  if (mycar.x<(opponent.x+100)) && ((mycar.x+100)>=opponent.x) &&
                              (mycar.y<(opponent.y+100)) && ((mycar.y+100)>=opponent.y)
                              then true
                              else false

collisionTest::State -> Array Car
collisionTest state = filter (collided state.myCar) state.cars

--accelerate positive=accel, neg=decelerat, 0=normal
getNewPos::State->Int->Array Car
getNewPos state accelerate=(\n->{id:n.id, x:if(n.y==(-100)) then (200*(((n.x+state.elapsed)`mod`4)+1)-175) else n.x
                                , y:if(n.y>530)
                                      then -200 
                                      else if accelerate==1 then n.y+(carSpeed*2)
                                                            else if accelerate==(-1)
                                                                    then n.y+(carSpeed/2)
                                                                    else n.y+carSpeed}) <$> state.cars

--main
main :: forall a. Eff(random :: RANDOM, console :: CONSOLE, frp ::FRP, dom ::DOM |a) Unit
main = do
    _ <- log "Running"
    carPool <- (traverse getCars (1 .. totalCars))
    let myCar={x:225,y:500}
    let initialState = { cars:carPool, myCar:myCar, elapsed:0, score:0, gameOver:false, gameMsg: "CarRace 2D!"}
    { stateBeh, updateState } <- render view initialState
    _<- updateState
      (validate <$> (key 37) <*> (key 38) <*> (key 39) <*> (key 40) <*> stateBeh)
      (animationFrame)
    pure unit
  where
    validate left up right down oldState
      | oldState.gameOver==true = oldState
      | null(collisionTest oldState) ==false= {cars:oldState.cars, myCar:oldState.myCar, elapsed:oldState.elapsed, score:oldState.score, gameOver:true, gameMsg: "Game Over!"}
      | left||right||up ||down    = {cars: if up then (getNewPos oldState 1)
                                                 else if down then (getNewPos oldState (-1))
                                                              else (getNewPos oldState 0)
                                  , myCar:  if left
                                              then {x:if oldState.myCar.x==5 then 5 else oldState.myCar.x-5, y:oldState.myCar.y}
                                              else if right
                                                    then {x:if oldState.myCar.x==895 then 895 else oldState.myCar.x+5, y:oldState.myCar.y}
                                                    else  oldState.myCar
                                  , elapsed:oldState.elapsed+1`mod`767
                                  , score:oldState.score+1
                                  , gameOver:false
                                  , gameMsg: oldState.gameMsg}
      | otherwise               = {cars:(getNewPos oldState 0), myCar:oldState.myCar, elapsed:oldState.elapsed+1`mod`767, score:oldState.score+1, gameOver:false, gameMsg: oldState.gameMsg}

view :: forall w i. State -> PrestoDOM i w
view state =
   --main layout
  linearLayout
    [ height Match_Parent
    , width Match_Parent
    , background "#ffffff"
    , name "rootNode"
    , orientation "Horizontal"
    ]
    [
      relativeLayout
      [ height Match_Parent
      , width $ V 1000
      , background "#ffffff"
      , orientation "vertical"
      , gravity "center"
      ]
      [
        --game container
        relativeLayout
        [ height Match_Parent
        , width $ V 1000
        , background "#ffffff"
        , orientation "vertical"
        ]
        (drawCars state <$> state.cars)
        ,
        --our car
        linearLayout
        [ width $ V 100
        , height $ V 100
        , orientation "horizontal"
        , background "#0000ff"
        , gravity "center"
        , margin ((toString (toNumber (state.myCar.x)))<>","<>(toString ((toNumber (state.myCar.y))))<>",0,0")
        ]
        [
         textView
          [ width $ V 40
          , height $ V 40
          , text "Me"
          , margin "10,0,0,0"
          , textSize "40"
          ]
        ]
      ],
      --score board
      linearLayout
      [ height Match_Parent
      , width Match_Parent
      , background "#000000"
      , orientation "vertical"
      , gravity "centerHorizontal"
      ]
      [ 
         --title
        linearLayout
        [ width Match_Parent
        , height $ V 40
        , background "#ff0000"
        , gravity "center"
        ]
        [
          textView
          [ width Match_Parent
          , height $ V 40
          , text $ show state.gameMsg
          , gravity "center"
          , textSize "28"
          ]
        ],
        textView
        [ width $ V 100
        , height $ V 40
        , color "#000000"
        , text $ "Score:"<>show (state.score/10)
        , textSize "28"
        ]
      ]
    ]