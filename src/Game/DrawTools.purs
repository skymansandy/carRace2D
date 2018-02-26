module Game.DrawTools where

import Data.Function(($))
import Data.Semigroup((<>))
import PrestoDOM.Core(Prop)
import PrestoDOM.Elements(linearLayout,textView, imageView)
import PrestoDOM.Properties(background, gravity,imageUrl, height, id_, margin, orientation, text, textSize, width)
import PrestoDOM.Types

import Data.Int (toNumber)
import Data.Number.Format (toString)


drawCars::forall t1 t18 t3 t4. t1-> { id::String, x :: Int , y :: Int | t18}-> VDom (Array (Prop t4)) t3
drawCars state car =
              linearLayout
              [ id_ car.id
              , width $ V 100
              , height $ V 100
              , orientation "horizontal"
              , background "#000000"
              , gravity "center"
              , margin ((toString (toNumber (car.x)))<>","<>(toString ((toNumber (car.y))))<>",0,0")
              ]
              [
                imageView
                 [ width $ V 150
                 , height $ V 150
                 , margin "0,0,0,0"
                 , imageUrl "assets/opcar"
                 ]
              ]