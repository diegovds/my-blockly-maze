import * as C from "./styles";

type Props = {
  skeletonWidth: string;
};

const Skeleton = ({ skeletonWidth }: Props) => {
  return <C.SkeletonCard width={skeletonWidth} />;
};

export default Skeleton;
