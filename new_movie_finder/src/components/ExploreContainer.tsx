export const ExploreContainer = ({name}: { name: string }) => {

    return (
        <div className="text-center absolute left-0 right-0 top-1/2 transform -translate-y-1/2">
            <strong className="text-3xl leading-normal">{name}</strong>
            <p className="text-base leading-normal text-gray-500 m-0">
                Explore{' '}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://ionicframework.com/docs/components"
                    className="no-underline"
                >
                    UI Components
                </a>
            </p>
        </div>
    );
};
