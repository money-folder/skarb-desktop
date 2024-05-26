import React from 'react';

// queries
import {
  useConnectToDb,
  useCurrentConnection,
  useDbSources,
  useRemoveDbSource,
} from '../../queries/db-source-queries';

// components
import LinkSource from './LinkSource';

// icons
import CrossIcon from '../../assets/cross.svg';
import CreateDb from './CreateDb';

const ConnectionsScreen = () => {
  const { data: fileNames = [] } = useDbSources();

  const { data: currentConnection } = useCurrentConnection();

  const removeDbSourceMutation = useRemoveDbSource();
  const connectToDbMutation = useConnectToDb();

  const onConnect = async (fileName: string) => {
    await connectToDbMutation.mutateAsync(fileName);
  };

  const onDelete = async (fileName: string) => {
    await removeDbSourceMutation.mutateAsync(fileName);
  };

  return (
    <div className="w-full">
      <h2 className="text-center font-extrabold text-xl">Connections</h2>

      <div className="mt-10 w-full flex flex-col items-center">
        <div className="w-2/3 flex gap-3">
          <LinkSource />
          <CreateDb />
        </div>

        <table className="mt-5 w-2/3">
          <thead>
            <tr>
              <th className="p-1 text-sm border-2 border-black">File Name</th>
              <th className="p-1 text-sm border-2 border-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fileNames.map((fileName) => (
              <tr key={fileName}>
                <td className="p-1 text-sm text-center border-2 border-black">
                  {fileName}
                </td>
                <td className="p-1 text-sm text-center border-2 border-black">
                  <span className="w-full inline-flex justify-center gap-5">
                    {currentConnection === fileName ? (
                      <></>
                    ) : (
                      <button
                        className="hover:underline"
                        onClick={() => onConnect(fileName)}
                      >
                        Connect
                      </button>
                    )}

                    <button
                      className="w-4 h-4  hover:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:no-underline"
                      onClick={() => onDelete(fileName)}
                      disabled={currentConnection === fileName}
                    >
                      <img src={CrossIcon} alt="cross" />
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConnectionsScreen;
