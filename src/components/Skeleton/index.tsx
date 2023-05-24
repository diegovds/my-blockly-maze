import * as C from "./styles";

type Props = {
  skeletonWidth: string;
  skeletonMarginBottom?: boolean;
};

const Skeleton = ({ skeletonWidth, skeletonMarginBottom }: Props) => {
  return <C.SkeletonCard width={skeletonWidth} margin={skeletonMarginBottom} />;
};

export default Skeleton;
