module Main where

import Prelude

import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE)
import Control.Monad.Eff.Random (RANDOM, randomInt)
import DOM (DOM)
import Data.Array ((..), filter, null)
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
import PrestoDOM.Elements (linearLayout, textView, relativeLayout, imageView)
import PrestoDOM.Properties (background, color, gravity, height, imageUrl, margin, name, orientation, text, textSize, visibility, width)
import PrestoDOM.Types (Length(..))
import PrestoDOM.Util (render)


--produce initial cars
getCars ::forall a. Int -> Eff(random :: RANDOM | a) Car
getCars a =
  randomInt 1 5 >>= \lane ->
    pure {id: ("c" <> (toString (toNumber a))), tag:a, x: (200*lane)-175, y:0-(a*350)}

--check collision of our car with an opponent car
collided::MyCar -> Car -> Boolean
collided mycar opponent =  if ((mycar.x+35)<(opponent.x+150)) && ((mycar.x+140)>=(opponent.x+35)) &&
                              ((mycar.y+35)<(opponent.y+175)) && ((mycar.y+150)>=(opponent.y+35))
                              then true
                              else false

--check collision with opponent cars
collisionTest::State -> Array Car
collisionTest state = filter (collided state.myCar) state.cars

--accelerate +ve=accel, -ve=decelerate, 0=normal
getNewPos::State->Int->Array Car
getNewPos state accelerate=(\n->{id:n.id, tag:n.tag, x:if(n.y==(-(n.tag*350))) then (200*(((n.x+state.elapsed)`mod`5)+1)-175) else n.x
                                , y:if(n.y>700)
                                      then 0-(n.tag*350)
                                      else if accelerate==1 then n.y+(carSpeed*2)
                                                             else if accelerate==(-1) then n.y+(carSpeed-1)
                                                                                      else n.y+carSpeed}) <$> state.cars

--main
main :: forall a. Eff(random :: RANDOM, console :: CONSOLE, frp ::FRP, dom ::DOM |a) Unit
main = do
    carPool <- (traverse getCars (1 .. totalCars))
    let myCar={x:225,y:450}
    let initialState = { cars:carPool, myCar:myCar, elapsed:0, score:0, gameOver:false, gameMsg: "CarRace 2D!"}
    { stateBeh, updateState } <- render view initialState
    _<- updateState
      (validate <$> (key 37) <*> (key 38) <*> (key 39)  <*> (key 40) <*> stateBeh)
      (animationFrame)
    pure unit
  where
    validate left up right down oldState
      | oldState.gameOver==true = oldState
      | null(collisionTest oldState) ==false= {cars:oldState.cars, myCar:oldState.myCar, elapsed:oldState.elapsed, score:oldState.score, gameOver:true, gameMsg: "Game Over. press F5 to restart!"}
      | left||right||up||down  = {cars: if up then (getNewPos oldState 1)
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


--layout
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
        ([
          imageView
          [ width $ V 1000
          , height Match_Parent
          , margin "0,0,0,0"
          , imageUrl "assets/road"
          ]
        ]<>(drawCars state <$> state.cars))
        ,
        --collision image
        linearLayout
        [ width $ V 100
        , height $ V 100
        , orientation "horizontal"
        , gravity "center"
        , margin ((toString (toNumber (state.myCar.x)))<>","<>(toString ((toNumber (state.myCar.y))))<>",0,0")
        ]
        [
          --our car
          imageView
          [ width $ V 150
          , height $ V 150
          , margin "0,0,0,0"
          , imageUrl "assets/mycar"
          ]
        ],
        imageView
        [ width $ V 150
        , height $ V 150
        , margin ((toString (toNumber (state.myCar.x)-20.0))<>","<>(toString ((toNumber (state.myCar.y)-50.0)))<>",0,0")
        , if state.gameOver == true then imageUrl "assets/fire" else imageUrl "assets/blank"
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
        , height $ V 100
        , background "#ff0000"
        , gravity "center"
        , margin "0,300,0,0"
        ]
        [
          textView
          [ width Match_Parent
          , height $ V 40
          , text $ show state.gameMsg
          , gravity "center"
          , textSize "35"
          ]
        ],
        textView
        [ width $ V 200
        , height $ V 40
        , color "#000000"
        , text $ "Score:"<>show (state.score/10)
        , margin "60,35,0,0"
        , textSize "30"
        ]
      ]
    ]