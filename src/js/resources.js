import { ImageSource, Sound, Resource, Loader } from "excalibur";

const Resources = {
  Player: new ImageSource("images/spritesheet.png"),
  Background: new ImageSource("images/cavernous.png"),
  PlatformTileSquare: new ImageSource("images/platformertilesquare.png"),
  PlatformTileRectangle: new ImageSource("images/platformertilesrectangle.png"),
  Enemy: new ImageSource("images/slimespritesheet.png"),
  Orb: new ImageSource("images/orbspritesheet.png"),
  Heart: new ImageSource("images/heart.png"),
};

const ResourceLoader = new Loader();
for (let res of Object.values(Resources)) {
  ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader };
