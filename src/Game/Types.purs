module Game.Types where

type Car = {
  id    :: String
, tag   :: Int
, x     :: Int
, y     :: Int
}

type MyCar={
  x::Int
, y::Int
}

type State = {
   cars      :: Array Car
,  myCar     :: MyCar
,  elapsed   :: Int
,  score     :: Int
,  gameOver  :: Boolean
,  gameMsg   :: String
}
