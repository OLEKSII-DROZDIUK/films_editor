import React from 'react';

const FileLoadError = () => {
   return (<div className="text-nowrap text-center d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-center">Incorrect file format</h1>
            <div className="font-italic text-center">
            <span>You сan upload *.txt format file to list, only in this format:</span>
            
                <p className="text-left">Title: Blazing Saddles
                Release Year: 1974
                Format: VHS
                Stars: Mel Brooks, Clevon Little, Harvey Korman, Gene Wilder, Slim Pickens, Madeline Kahn</p>

                <p className="text-left">Title: Casablanca
                Release Year: 1942
                Format: DVD
                Stars: Humphrey Bogart, Ingrid Bergman, Claude Rains, Peter Lorre</p>

                <p className="text-left">Title: Charade
                Release Year: 1953
                Format: DVD
                Stars: Audrey Hepburn, Cary Grant, Walter Matthau, James Coburn, George Kennedy</p>

            </div>
            <button type="button" className="btn btn-dark" 
            onClick={() =>window.location="/"}
            >Reload page</button>
        </div>)
}

export default FileLoadError;