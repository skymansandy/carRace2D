module Game.Types where


--opponent cars type
type Car = {
  id    :: String
, tag   :: Int
, x     :: Int
, y     :: Int
}

--our car
type MyCar={
  x::Int
, y::Int
}

--game state
type State = {
   cars        :: Array Car
,  myCar       :: MyCar
,  elapsed     :: Int
,  score       :: Int
,  gameOver    :: Boolean
,  gameMsg     :: String
}
